// class EnvironmentBuilder {
//     HOST_API: string;

//     PORT_API: string;

//     readonly isProductionBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'production';

//     readonly isLocalBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'local';

//     readonly isDevMode = process.env.NODE_ENV !== 'production';

//     private isTestBuild = process.env.NODE_ENV === 'production' && process.env.ENV === 'test';

//     private SERVER_HOST_DEV = 'http://z14-0467-jdev.vesta.ru';
//     // private SERVER_HOST_DEV = 'http://z14-0653-etl2.vesta.ru';

//     // private SERVER_HOST_PROD = `http://${window.location.hostname}`;

//     private SERVER_PORT_DEV = '20002';

//     private SERVER_PORT_PROD = window.location.port;

//     ApiURL(): string {
//         if (this.isProductionBuild || this.isTestBuild) {
//             this.HOST_API = this.SERVER_HOST_PROD;
//             this.PORT_API = this.SERVER_PORT_PROD;
//         } else if (this.isDevMode || this.isLocalBuild) {
//             this.HOST_API = this.SERVER_HOST_DEV;
//             this.PORT_API = this.SERVER_PORT_DEV;
//         }

//         return `${this.HOST_API}:${this.PORT_API}/redirect-kube`;
//     }

//     isProdMode = () => this.isProductionBuild;

//     isTestMode = () => this.isLocalBuild || this.isDevMode || this.isTestBuild;
// }

// const env = new EnvironmentBuilder();
// export const API_URL = env.ApiURL();
// export const BaseImageURL = `${API_URL}/v2/terminal/image`;
// export const TestMode = env.isTestMode();
// export const ProdMode = env.isProdMode();
