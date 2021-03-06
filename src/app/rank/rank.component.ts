import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { RankingModel } from '../shared/models/ranking.model';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import moment from 'moment';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit{
  rank: any;
  rankingList: RankingModel[]=[];
  endDateTime!: any;
  displayedColumns: string[] = ['posicao','nome','entidade','avaliacao', 'pontuacao', 'url']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<RankingModel>();
  visibility:boolean = false;
  loading: boolean = true;

  constructor(private mapleafservice: MapleafService) {
  }

  ngOnInit(){
    this.getRankingInformation();
  }

  getRankingInformation(){
    this.mapleafservice.getRanking().then(_ => { 
      this.visibility = true
      setTimeout(() => {
        this.loading = false;
      },1000);
      this.rank = this.mapleafservice.ranking
      for(var i in this.rank){
        this.rankingList.push(
          {
            end_datetime: moment(this.rank[i]["end_datetime"]).format("DD/MM/YYYY"),
            position: (Number(i)+1),
            name: this.rank[i]["management_unit"]["name"],
            public_entity: this.rank[i]["management_unit"]["public_entity"],
            url: this.rank[i]["management_unit"]["start_urls"],
            score: this.rank[i]["score"]
          }
        ) 
      }
      this.dataSource.data = this.rankingList;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
