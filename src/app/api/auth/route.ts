
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const USERS_FILE = path.join(process.cwd(), 'users.json');

// Helper to hash password
function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper to read users
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        return {};
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    try {
        return JSON.parse(data);
    } catch {
        return {};
    }
}

// Helper to save users
function saveUser(username: string, passwordHash: string, email: string, subscription?: any) {
    const users = getUsers();
    users[username] = {
        email,
        password: passwordHash,
        subscription: subscription || { planId: 'basic', status: 'active' }
    };
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action, username, password, email } = body;

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
        }

        const users = getUsers();

        if (action === 'signup') {
            if (users[username]) {
                return NextResponse.json({ error: 'User already exists' }, { status: 400 });
            }
            saveUser(username, hashPassword(password), email || '');
            return NextResponse.json({ success: true, message: 'User created' });
        }

        if (action === 'login') {
            const user = users[username];

            // Allow both plain and hashed for backward compatibility with manual entries
            const isValid = user && (user.password === password || user.password === hashPassword(password));

            if (!isValid) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }

            return NextResponse.json({
                success: true,
                message: 'Logged in',
                subscription: user.subscription
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (e) {
        console.error("Auth error", e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
