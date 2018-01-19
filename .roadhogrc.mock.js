import mockjs from 'mockjs';

export default {
	'GET /api/users': (req,res)=>{ 
		res.send(
			{users: [1,2] }
		)
	},
	'GET /api/test': (req,res)=>{ 
		res.send("test");
	},
	'GET /api/user':(req,res)=>{
		// console.log("req");
		res.send(false);
	},
	'POST /api/login/account': (req, res) => {
    	const { password, userName, type } = req.body;
    	console.log(req.body);
    	res.send({
      		status: password === '888888' && userName === 'admin' ? true : false,
      		type,
    	});
  	},
};