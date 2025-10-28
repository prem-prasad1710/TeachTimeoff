from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
import mysql.connector
import os
from TechTimeoff.urgent import combined_urgency  # ✅ Your AI function (module inside `TechTimeoff`)

app = Flask(__name__)
CORS(app)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-key')

# ------------------------------------------------
# ✅ DATABASE CONNECTION HELPERS
# ------------------------------------------------
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', 'Simar#9445'),
            database=os.environ.get('DB_NAME', 'login_page')
        )
        return conn
    except mysql.connector.Error as e:
        print("❌ DB Connection Error:", e)
        return None

def get_cursor():
    conn = get_db_connection()
    if conn:
        return conn, conn.cursor(dictionary=True)
    return None, None


# ------------------------------------------------
# ✅ BASIC ROUTES
# ------------------------------------------------
@app.route('/')
def home():
    try:
        return render_template('login.html')
    except Exception:
        return "<h3>Login page missing. Navigate to /signup or /login</h3>"

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn, cursor = get_cursor()
        if not cursor:
            flash("⚠️ Database not available.")
            return redirect(url_for('signup'))

        try:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                flash("⚠️ Username already exists!")
                return redirect(url_for('signup'))

            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
            conn.commit()
            flash("✅ Signup successful! Please login.")
            return redirect(url_for('login'))
        except Exception as e:
            flash(f"❌ Error during signup: {str(e)}")
        finally:
            cursor.close()
            conn.close()

    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn, cursor = get_cursor()
        if not cursor:
            flash("⚠️ Database not available.")
            return redirect(url_for('login'))

        try:
            cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
            user = cursor.fetchone()

            if user:
                flash(f"✅ Welcome {username}!")
                return render_template('dashboard.html', username=username)
            else:
                flash("❌ Invalid username or password.")
        except Exception as e:
            flash(f"❌ Login error: {str(e)}")
        finally:
            cursor.close()
            conn.close()

    return render_template('login.html')


# ------------------------------------------------
# ✅ HEALTH CHECK
# ------------------------------------------------
@app.route('/health')
def health():
    conn, cursor = get_cursor()
    if conn:
        try:
            cursor.execute('SELECT 1')
            return jsonify({'status': 'ok'})
        except:
            return jsonify({'status': 'db-error'}), 500
        finally:
            cursor.close()
            conn.close()
    return jsonify({'status': 'no-db'}), 500


# ------------------------------------------------
# ✅ URGENCY PREDICTION (AI + DATABASE STORAGE)
# ------------------------------------------------
@app.route('/api/urgency', methods=['POST'])
def check_urgency():
    try:
        data = request.get_json()
        username = data.get('username', 'unknown')
        reason = data.get('reason', '').strip()

        if not reason:
            return jsonify({"error": "Reason field cannot be empty"}), 400

        # 🧠 Call your AI urgency function
        result = combined_urgency(reason)

        keyword_urgency = result.get("keyword_urgency")
        sentiment_urgency = result.get("sentiment_urgency")
        sentiment_score = result.get("sentiment_score")

        # 💾 Save to DB
        conn, cursor = get_cursor()
        if cursor:
            cursor.execute("""
                INSERT INTO leave_requests (username, reason, keyword_urgency, sentiment_urgency, sentiment_score)
                VALUES (%s, %s, %s, %s, %s)
            """, (username, reason, keyword_urgency, sentiment_urgency, sentiment_score))
            conn.commit()
            cursor.close()
            conn.close()

        # 🔔 If high urgency, trigger admin popup on frontend
        popup_message = None
        if keyword_urgency == "High" or sentiment_urgency == "High":
            popup_message = f"⚠️ Urgent Leave Request by {username}: '{reason[:50]}...'"

        return jsonify({
            "username": username,
            "reason": reason,
            "keyword_urgency": keyword_urgency,
            "sentiment_urgency": sentiment_urgency,
            "sentiment_score": sentiment_score,
            "popup_message": popup_message
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


# ------------------------------------------------
# ✅ ADMIN VIEW (Fetch all leave requests)
# ------------------------------------------------
@app.route('/api/admin/requests', methods=['GET'])
def admin_requests():
    conn, cursor = get_cursor()
    if not cursor:
        return jsonify({"error": "Database not available"}), 500

    try:
        cursor.execute("SELECT * FROM leave_requests ORDER BY created_at DESC")
        rows = cursor.fetchall()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# ------------------------------------------------
# ✅ RUN APP
# ------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
