
var mailSendingApp ={
	urlToken: '',
	urlEmailService:'',
	apiKey:'',
	init: function(env){
		if(env=='prod'){
			urlToken = 'https://prodapi.apigtwy.amer.amway.net:443/token';
			urlEmailService = 'https://prodapi.apigtwy.amer.amway.net:443/elaw-mail/1.0.0/send-email';
			apiKey = 'RGdhZXl0eDdUNVJiY2tNMkpOQkFqYU5kT05jYTphWk1uRVFtZ2x6QzFqOG5RMmtGV3pTcGY3NTBh';
		}else{
			urlToken = 'https://preprodapi.apigtwy.amer.amway.net:443/token';
			urlEmailService = 'https://preprodapi.apigtwy.amer.amway.net:443/elaw-mail/1.0.0/send-email';
			apiKey = 'aWZVR2Y0bHNmUUd5UnByTWdxM1ZuUkpwaWhNYTpPTTJtUU1vUmlCbVp0enlydm1qbnM5RGtWYndh';			
		}
	},
	
	sendEmail: function(emailReq, env){
		this.init(env);
		this.getToken((err, token)=> {
			if (err) {
				console.error('Error al obtener token de acceso:', err);
				return;
			}

			this.sendEmailWithToken(emailReq, token, function(err, response) {
				if (err) {
					console.error('Error al enviar email:', err);
					return;
				}

				console.log('Respuesta:', response);
			});
		});
	},
	
    encodeFormData: function(data) {
            return Object.keys(data).map(key => 
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            ).join('&');
    },

	getToken: function(callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${urlToken}`, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('Authorization', `Basic ${apiKey}`);

            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        callback(null, response.access_token);
                    } else {
                        callback(new Error(xhr.statusText), null);
                    }
                }
            };
            const data = {
				grant_type: 'client_credentials',
				scope: 'openid'
			};	
			
            xhr.send(this.encodeFormData(data));
    },

    sendEmailWithToken: function (emailReq,token, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${urlEmailService}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        callback(null, response);
                    } else {
                        callback(new Error(xhr.statusText), null);
                    }
                }
            };
			
            const data = JSON.stringify(emailReq);			

            xhr.send(data);
        }		
}
