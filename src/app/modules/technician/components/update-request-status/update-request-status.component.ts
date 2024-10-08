import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicianService } from '../../services/technician.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver'; 
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-update-request-status',
  templateUrl: './update-request-status.component.html',
  styleUrls: ['./update-request-status.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class UpdateRequestStatusComponent {
  requestId: number=this.route.snapshot.params["requestId"];
  updateFrom!: FormGroup;
  commentForm!: FormGroup;
  comments: any[] = []; 
  listOfComments:any[]=[];
  statusOptions = ['PENDING','INPROGRESS','COMPLETED','DEFERRED','CANCELLED'];
  listOfPriorities: any = ['LOW' , "MEDIUM" , "HIGH"];
  currentUserId!:string;

  constructor(private technicianService:TechnicianService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private snackBar : MatSnackBar,
    private router:Router,
    private authService:AuthService
  ){
    this.getRequestByIdT();
    this.loadComments();
  this.updateFrom=this.fb.group
  ({
    requesterId:[null,[Validators.required]],
    title:[null,[Validators.required]],
    description:[null,[Validators.required]],
    lastUpdate:[null,[Validators.required]],
    creationDate:[null,[Validators.required]],
    priority:[null,[Validators.required]],
    status:[null,[Validators.required]]
  })
  this.commentForm = this.fb.group({
    text: ['', [Validators.required]]
  });
  this.currentUserId=StorageService.getUserId();
  }

  getRequestByIdT(){
    console.log(this.requestId);
this.technicianService.getRequestByIdT(this.requestId).subscribe((res) => {
  if (res.lastUpdate) {
    res.lastUpdate = this.formatDate(res.lastUpdate);
  }
  this.updateFrom.patchValue(res);
  console.log(res);
})}
formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


  updateRequestStatus(){
    const status=this.updateFrom.get('status')!.value;
    this.technicianService.updateRequestStatus(this.requestId,status).subscribe((res) =>{
      if(res.requestId != null){
        this.snackBar.open("Request Status Updated Successfully", "Close",{ duration: 5000});
        this.router.navigateByUrl("/technician/requestsList");
      }else{
        this.snackBar.open("Something went wrong", "ERROR",{ duration: 5000});
      }
    })
   }
   ///
   loadComments() {
    this.technicianService.getCommentsByRequestId(this.requestId).subscribe(comments => {
      this.listOfComments = comments;
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      const newComment = {
        userId: Number(this.currentUserId), //1 Replace with actual user ID
        requestId: this.requestId,
        text: this.commentForm.get('text')?.value,
        creationDate: new Date()
      };

      this.technicianService.createComment(newComment).subscribe(comment => {
        this.comments.push(comment);
        this.commentForm.reset();
        this.snackBar.open("Comment added successfully", "Close", { duration: 5000 });
        this.loadComments();
      }, error => {
        this.snackBar.open("Failed to add comment", "ERROR", { duration: 5000 });
      });
    }
  }
  deleteComment(commentId: number) {
    this.technicianService.deleteComment(commentId).subscribe(() => {
      this.listOfComments = this.listOfComments.filter(comment => comment.commentId !== commentId);
      this.snackBar.open('Comment deleted successfully', 'Close', { duration: 3000 });
    }, error => {
      this.snackBar.open('Failed to delete comment', 'Close', { duration: 3000 });
    });
  }
  downloadPDF() {
    this.technicianService.generatePDF(this.requestId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, `request_${this.updateFrom.get('title')!.value}.pdf`);
    }, error => {
      this.snackBar.open('Failed to download PDF', 'Close', { duration: 3000 });
    });
  }
  
}
