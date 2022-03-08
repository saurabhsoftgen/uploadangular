import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  title:any;
  description:any;
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;
  constructor(private tutorialService: TutorialService) { }
  ngOnInit(): void {
  }
  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
   
     this.title=data.title;
     this.description=data.description;
    
    const formData: FormData  = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    console.log(formData);
    this.tutorialService.create(formData)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
