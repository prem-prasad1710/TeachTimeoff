@echo off
echo ========================================
echo TechTimeOff Flask Backend Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Python found
echo.

echo 📦 Creating virtual environment...
python -m venv venv
echo ✅ Virtual environment created
echo.

echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat
echo ✅ Virtual environment activated
echo.

echo 📥 Installing dependencies...
pip install -r requirements.txt
echo ✅ Dependencies installed
echo.

echo ⚙️ Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file from template
    echo.
    echo ⚠️ IMPORTANT: Please edit .env file with your MySQL credentials:
    echo    DATABASE_URL=mysql+pymysql://username:password@localhost:3306/techtimeoff
    echo.
) else (
    echo ⚠️ .env file already exists. Skipping...
    echo.
)

echo 📊 Creating database...
echo.
echo Please run the following SQL command in MySQL Workbench:
echo    CREATE DATABASE IF NOT EXISTS techtimeoff;
echo.
pause

echo.
echo 🗄️ Initializing database tables...
python init_db.py init

echo.
set /p SEED="Do you want to seed the database with sample data? (y/n): "
if /i "%SEED%"=="y" (
    python init_db.py seed
    echo ✅ Database seeded successfully
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the server:
echo   venv\Scripts\activate.bat  # Activate virtual environment
echo   python app.py              # Start the server
echo.
echo The server will run on http://localhost:5000
echo.
echo Sample users (if seeded):
echo   kritika@jims.edu / password123 (faculty)
echo   rajesh@jims.edu / password123 (coordinator)
echo   sunita@jims.edu / password123 (chief_coordinator)
echo   amit@jims.edu / password123 (principal)
echo.
pause
