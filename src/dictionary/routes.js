import w from './words';


const routes = {
    root: '/',
    login: `/${w.login}`,
    dashboard: `/${w.dashboard}`,
    companyRoot: '/companies/:companyId',
    campaignRoot: '/campaigns/:campaignId'
}

export default routes;
