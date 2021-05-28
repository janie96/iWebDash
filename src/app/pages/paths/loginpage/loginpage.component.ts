import {Component, OnInit, OnDestroy, HostListener} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {LoginRequestModel} from "../../../models/loginRequest.model";

@Component({
    selector: "app-loginpage",
    templateUrl: "loginpage.component.html"
})
export class LoginpageComponent implements OnInit, OnDestroy {
    isCollapsed = true;
    focus;
    focus1;
    focus2;
    loginForm: FormGroup;
    loginErr:boolean = false;

    constructor(private formBuilder: FormBuilder,private authService:AuthService) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    @HostListener("document:mousemove", ["$event"])
    onMouseMove(e) {
        var squares1 = document.getElementById("square1");
        var squares2 = document.getElementById("square2");
        var squares3 = document.getElementById("square3");
        var squares4 = document.getElementById("square4");
        var squares5 = document.getElementById("square5");
        var squares6 = document.getElementById("square6");
        var squares7 = document.getElementById("square7");
        var squares8 = document.getElementById("square8");

        var posX = e.clientX - window.innerWidth / 2;
        var posY = e.clientY - window.innerWidth / 6;

        squares1.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares2.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares3.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares4.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares5.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares6.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.05 +
            "deg) rotateX(" +
            posY * -0.05 +
            "deg)";
        squares7.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)";
        squares8.style.transform =
            "perspective(500px) rotateY(" +
            posX * 0.02 +
            "deg) rotateX(" +
            posY * -0.02 +
            "deg)";
    }

    ngOnInit() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("register-page");
        this.onMouseMove(event);

    }

    onLoginSubmit(){
        console.log("*************");
        console.log("User clicked login");
        console.log(this.loginForm);
        console.log("*************");
        console.log(this.loginForm.controls.username.value);
        console.log("*************");
        console.log(this.loginForm.controls.password.value);
        console.log("*************");
        if(this.loginForm.valid){
            let loginRequest:LoginRequestModel = new LoginRequestModel();
            loginRequest.username = this.loginForm.controls.username.value;
            loginRequest.password = this.loginForm.controls.password.value;
            this.authService.login(loginRequest).subscribe(response=>{
                console.log("SUCCESSFULL LOGIN");
            },error => {
                this.loginErr = true;
            })
        }

    }

    ngOnDestroy() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("register-page");
    }


}
