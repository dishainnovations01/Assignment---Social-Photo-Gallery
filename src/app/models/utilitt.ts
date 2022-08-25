import { environment } from "src/environments/environment";


export const Utility = Object.freeze({
	baseImageUrl: environment.baseImageUrl,
	imageUrlEnd: '?alt=media&token=sfsdfsd',
	mapApiKey: 'AIzaSyBx8bchFMevf5k8PiL2oCml8YcaMbfzqrE',
	userKey: 'badabhalu_admin_user'
});






export class ScrollEvent {
	public static ReachedToEnd($event: any): boolean {
		if ($event.target.offsetHeight + $event.target.scrollTop >= $event.target.scrollHeight - 2) {
			return true;
		} else {
			console.log("ddd4")
			return false;
		}
	}
}

