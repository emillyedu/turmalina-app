import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';;
// Material Popups & Modals
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  imports: [MatButtonModule, 
            MatSelectModule, 
            MatGridListModule, 
            MatCardModule, 
            MatTooltipModule,
            MatExpansionModule, 
            MatToolbarModule, 
            MatTableModule, 
            MatPaginatorModule, 
            MatSortModule, 
            MatListModule,
            MatToolbarModule,
            MatButtonModule,
            MatSidenavModule,
            LayoutModule,
            MatIconModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule,
            MatDialogModule,
            MatProgressBarModule,
            MatProgressSpinnerModule],

  exports: [MatButtonModule, 
            MatSelectModule, 
            MatGridListModule, 
            MatCardModule, 
            MatTooltipModule,
            MatExpansionModule, 
            MatToolbarModule, 
            MatTableModule, 
            MatPaginatorModule, 
            MatSortModule, 
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatIconModule,
            MatToolbarModule,
            MatButtonModule,
            MatSidenavModule,
            LayoutModule,
            MatIconModule,
            MatAutocompleteModule,
            MatInputModule,
            MatFormFieldModule,
            MatDialogModule,
            MatProgressBarModule,
            MatProgressSpinnerModule]
})
export class MaterialModule { }
