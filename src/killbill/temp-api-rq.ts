export async function getKillBillData(url: string, limit: number = 100, retorno: string = 'json') {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Accept-Language', 'es,en-US;q=0.9,en;q=0.8');
	myHeaders.append('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');
	myHeaders.append('X-Killbill-Apikey', 't_test');
	myHeaders.append('X-Killbill-Apisecret', 'CzjU~009BxA\\');
	myHeaders.append('X-Killbill-Comment', '');
	myHeaders.append('X-Killbill-Createdby', 'admin');
	myHeaders.append('X-Killbill-Reason', '');

	const base_url = 'http://killbill.towithouston.com/1.0/kb';
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow' as RequestRedirect
	};

	try {
		// const response = await fetch(base_url + url, requestOptions);
		const response = await fetch(`${base_url}${url}?limit=${limit}`, requestOptions);
		let result;

		switch (retorno) {
			case 'json':
				result = await response.json();
				break;

			case 'txt':
				result = await response.text();
				break;

			default:
				result = response;
				break;
		}
		return result;
	} catch (error) {
		return error;
	}
}
