from flask import Flask, request, session, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from google.cloud import storage
from dotenv import load_dotenv
import os, json

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Initialize Flask app
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

# ✅ Setup Flask-Bcrypt
bcrypt = Bcrypt(app)

# ✅ Setup Google Cloud Storage
service_account_path = os.getenv("SERVICE_ACCOUNT_FILE")
gcs_bucket_name = os.getenv("GCS_BUCKET")

if not service_account_path or not gcs_bucket_name:
    raise EnvironmentError("Missing SERVICE_ACCOUNT_FILE or GCS_BUCKET in .env")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = service_account_path
gcs_client = storage.Client()
bucket = gcs_client.bucket(gcs_bucket_name)

# ✅ Helper: Save user data as JSON in GCS
def save_user_to_gcs(username, data):
    blob = bucket.blob(f"users/{username}.json")
    blob.upload_from_string(json.dumps(data), content_type="application/json")

# ✅ Helper: Load user data from GCS
def load_user_from_gcs(username):
    blob = bucket.blob(f"users/{username}.json")
    if not blob.exists():
        return None
    return json.loads(blob.download_as_text())

# ✅ Signup route
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            return "Username and password are required", 400

        if load_user_from_gcs(username):
            return "User already exists", 400

        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        user_data = {"username": username, "password_hash": password_hash}
        save_user_to_gcs(username, user_data)
        session["username"] = username
        return redirect(url_for("dashboard"))

    return render_template("signup.html")

# ✅ Login route
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username or not password:
            return "Username and password are required", 400

        user_data = load_user_from_gcs(username)
        if not user_data or not bcrypt.check_password_hash(user_data["password_hash"], password):
            return "Invalid credentials", 401

        session["username"] = username
        return redirect(url_for("dashboard"))

    return render_template("login.html")

# ✅ Dashboard route
@app.route("/dashboard")
def dashboard():
    if "username" not in session:
        return redirect(url_for("login"))
    return f"👋 Welcome {session['username']} to your dashboard!"

# ✅ Logout route
@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("login"))

# ✅ Run the app
if __name__ == "__main__":
    app.run(debug=True)
