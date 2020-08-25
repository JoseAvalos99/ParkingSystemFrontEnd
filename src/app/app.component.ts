import { Component, OnInit, OnDestroy } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'ParkingSystemFrontEnd';
	subscription: Subscription;
	lista=[0,0,0];

	constructor(private _stompService: StompService) { }

	ngOnInit(): void {
		console.log(this.lista);
		//													amq.topic/routingKey
		this.subscription = this._stompService.subscribe('/topic/ParkingSystemMsgRoutingKey').subscribe(this.MyRoutingKey);
	}
	MyRoutingKey = (message: Message) => {
		console.log(message.body);
		var array = JSON.parse(message.body);
		this.lista = array;
	}
	openDoor = () => {
		alert('Se abrira la puerta');
		let obj = {key:"openDoor", value:"YES"}
		let json = JSON.stringify(obj);
		this._stompService.publish('/topic/ParkingSystemArduinoConnection', json);	
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
