import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  constructor( private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';
  id:any;
  status:any;
  title:any;
  description:any;
  currentTutorialdata:any;
  ngOnInit(): void {
    this.message = '';
      this.id = this.route.snapshot.paramMap.get('id');
     this.getTutorial(this.id);
  }
  getTutorial(id: any): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          
          this.currentTutorialdata=data;
          this.currentTutorial=this.currentTutorialdata.data;
          console.log(this.currentTutorial.id);
        },
        error => {
          console.log(error);
        });
  }
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.status=data.published;
    const formData: FormData  = new FormData();
    formData.append('published',this.status);
  
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, formData)
      .subscribe(
        response => {
          this.currentTutorial.published = this.status;
          console.log(this.status);
          console.log(formData);
         // this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
  updateall(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.status=data.published;
    this.title=data.title;
    this.description=data.description;
    const formData: FormData  = new FormData();
    formData.append('title',this.title);
    formData.append('description',this.description);

    this.message = '';
    this.tutorialService.updateall(this.currentTutorial.id, formData)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }

}
