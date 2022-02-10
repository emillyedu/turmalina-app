import { RankingModel } from './../shared/models/ranking.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapleafService } from '../turmalina/mapleaf/mapleaf.service';
import { RankingModel } from '../shared/models/ranking.model';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import moment from 'moment';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  rank: any;
  rankingList: RankingModel[];
  endDateTime!: any;
  displayedColumns: string[] = ['posicao','nome','entidade','avaliacao', 'pontuacao', 'url']
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource= new MatTableDataSource<RankingModel>([]);
  verify: boolean = false;

  constructor(private mapleafservice: MapleafService) { 
    this.rankingList = []
    this.getRank()
  }

  async getRank(){
    await this.mapleafservice.getRanking().then(_ => {
      this.rank = this.mapleafservice.ranking
      for(var i in this.rank){
        const item = new Object() 
        this.rankingList.push(
          
            item.end_datetime = moment(this.rank[i]["end_datetime"]).format("DD/MM/YYYY"),
            position: (Number(i)+1),
            name: this.rank[i]["management_unit"]["name"],
            public_entity: this.rank[i]["management_unit"]["public_entity"],
            url: this.rank[i]["management_unit"]["url"],
            score: this.rank[i]["score"]
        ) 
      }
    })
  }

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.rankingList;
    console.log(this.dataSource.data)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
