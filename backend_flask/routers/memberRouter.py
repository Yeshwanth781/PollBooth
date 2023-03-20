from flask import Blueprint
from flask import jsonify,redirect, url_for, request,json
#defining bluprint
member_bp=Blueprint('member_bp',__name__)
from models import *
from app import app;

@member_bp.get('/<int:teamid>')
def Get_Members(teamid):
    try:
        data=teams.query.filter_by(teamid=teamid).first().members
        data=jsonify([x.to_json() for x in data])
        return data.json,200
    except Exception as e:
        return {'messege':str(e)},400

@member_bp.post('/add')
def Add_Member():
    try:
        data=json.loads(request.args.get("json"))
        app.logger.info(data)
        if data is None :
            data=request.json
        userid=data['userid']
        teamid=data['teamid']
        app.logger.info(userid)
        exists=db.session.query(members).filter_by(user_id=userid,team_id=teamid).all()
        if len(exists)>0 :
            return {'messege':'User Already Present'},200
        db.session.execute(members.insert().values(user_id=userid,team_id=teamid))
        db.session.commit()
        return {'messege':'Member Added Successfully'},200
    except Exception as e:
        return {'messege':str(e)}

@member_bp.post('/addemail/<email>')
def Add_Member_By_Email(email):
    try:
        data=request.json
        teamid=data['teamid']
        u=users.query.filter_by(email=email).first()
        if u is None :
            return {'messege':'No such User'},400
        bdy={"teamid":teamid,"userid":u.id}
        redirect_url = url_for('member_bp.Add_Member',_external=True,json=json.dumps(bdy))
        return redirect(redirect_url, code=307)
    except Exception as e:
        return {'messege':str(e)},400
