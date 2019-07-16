import { Application } from './application';

Application
    .run()
    .then((_app: Application): void => {
    }).catch((e: Error): void => {
        console.log(e);
    });
