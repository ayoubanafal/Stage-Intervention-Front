import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss',
    '../../../../../assets/css/nucleo-icons.css',
    '../../../../../assets/css/nucleo-svg.css',
    '../../../../../assets/css/soft-ui-dashboard-tailwind.css']
})
export class PdfGeneratorComponent{
  technicianId: number =this.route.snapshot.params["techId"];
  startDate: string = '';
  endDate: string = '';
  generating: boolean = false;
  errorMessage: string | null = null;
  name: string = '';

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    
  }

  generatePDF(): void {
    this.authService.getUserById(this.technicianId).subscribe((res)=>{
      this.name=res.name;
    })
    this.generating = true;
    console.log(this.technicianId);
    console.log(this.startDate);
    console.log(this.endDate);
    this.adminService.generatePDF(this.technicianId, this.startDate, this.endDate)
      .subscribe(
        (blob: Blob) => {
          // Create a link element and trigger download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.name+' performance report.pdf'; // Name of the downloaded file
          a.click();
          window.URL.revokeObjectURL(url);
          this.generating = false;
        },
        (error) => {
          console.error('Error generating PDF:', error); // Log detailed error
          this.errorMessage = 'Error generating PDF. Please try again.';
          this.generating = false;
        }
      );
  }
}