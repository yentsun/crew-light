import w from './words';


const routes = {
    login: `/${w.login}`,
    companyList: '/',
    companyRoot: '/companies/:companyId',
    campaignRoot: '/campaigns/:campaignId'
}

export default routes;
