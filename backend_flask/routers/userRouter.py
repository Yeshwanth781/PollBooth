from flask import Blueprint,request
#defing bluprint
from app import db,app
user_bp=Blueprint('user_bp',__name__)
from models import users

# signup route
@user_bp.post('/signup')
def Signup():
    data=request.json
    try:
        exists=bool(users.query.filter_by(email=data['email']).all())
        if exists==False:
            u=users(name=data['name'],email=data['email'],password=data['password'])
            db.session.add(u)
            db.session.commit()
            return {'messege':'User Signed Up Successfully'},200
        else:
            return {
                'messege':'Email Already Registed'
            },400
    except Exception as e:
        return {'messege':str(e)},400


# Login route
@user_bp.post('/login')
def Login():
    data=request.get_json()
    app.logger.info('logging...')
    app.logger.info(type(data))
    try:
        exists=bool(users.query.filter_by(email=data['email']).all())
        if exists==True:
            return {'messege':'Logged Successfully'},200
        else:
            return {
                'messege':'Please Signup'
            },300
    except Exception as e:
        return {'messege':str(e)},400
