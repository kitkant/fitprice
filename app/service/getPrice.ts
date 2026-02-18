import axios from 'axios'


const gerDataTariffs = () =>{

	const data = axios.get('https://t-core.fit-hub.pro/Test/GetTariffs')

	return data
}

export default gerDataTariffs