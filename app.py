from flask import Flask, request, session, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from google.cloud import storage
import os, json

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
bcrypt = Bcrypt(app)

# Setup Google Cloud Storage Client
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("SERVICE_ACCOUNT_FILE")
gcs_client = storage.Client()
bucket_name = os.getenv("GCS_BUCKET")
bucket = gcs_client.bucket(bucket_name)

# Helper: Upload JSON under users/<username>.json
def save_user_to_gcs(username, data):
    blob = bucket.blob(f"users/{username}.json")
    blob.upload_from_string(json.dumps(data), content_type="application/json")

# Helper: Read from GCS
def load_user_from_gcs(username):
    blob = bucket.blob(f"users/{username}.json")
    if not blob.exists(): return None
    return json.loads(blob.download_as_text())

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if load_user_from_gcs(username):
            return "User already exists", 400

        pw_hash = bcrypt.generate_password_hash(password).decode()
        user = {"username": username, "password_hash": pw_hash}
        save_user_to_gcs(username, user)
        session["username"] = username
        return redirect(url_for("dashboard"))
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = load_user_from_gcs(username)
        if not user or not bcrypt.check_password_hash(user["password_hash"], password):
            return "Invalid credentials", 401

        session["username"] = username
        return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "username" not in session:
        return redirect(url_for("login"))
    return f"Welcome {session['username']} to your dashboard!"

@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
