from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://yesh:12345678@localhost:3306/poll'
db=SQLAlchemy(app)
migrate=Migrate(app,db)
from routers.PollRouter import poll_bp
from routers.teamRouter import team_bp
from routers.memberRouter import member_bp
from routers.userRouter import user_bp
import json

app.register_blueprint(user_bp,url_prefix='/users')
app.register_blueprint(team_bp,url_prefix='/teams')
app.register_blueprint(member_bp,url_prefix='/members')
app.register_blueprint(poll_bp,url_prefix='/polls')