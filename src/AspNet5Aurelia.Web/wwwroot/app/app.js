import 'materialize';
import 'materialize/dist/js/materialize';

export class App {
	configureRouter(config, router) {
		config.title = 'AspNet 5 Aurelia';
		
		config.map([
			{ route: ['', 'login'], moduleId: './views/account/login' }
		]);
		
		this.router = router;
	}
}