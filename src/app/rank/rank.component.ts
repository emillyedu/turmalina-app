import { Component, OnInit, ViewChild } from '@angular/core';
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
  rankingList: RankingModel[] = [];
  endDateTime!: any;
  displayedColumns: string[] = ['posicao','nome','entidade','avaliacao', 'pontuacao', 'url']
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  dataSource = new MatTableDataSource<RankingModel>(this.rankingList);

  constructor(private mapleafservice: MapleafService) { }

  ngOnInit(): void {
    this.mapleafservice.getRanking().then( _ => {
      this.rank = this.mapleafservice.ranking
      for(var i in this.rank){
        let position = (Number(i)+1).toString();
        this.rankingList.push(
          new RankingModel(
            moment(this.rank[i]["end_datetime"]).format("DD/MM/YYYY"),
            position,
            this.rank[i]["management_unit"]["name"],
            this.rank[i]["management_unit"]["public_entity"],
            this.rank[i]["management_unit"]["url"],
            this.rank[i]["score"]
          )
        )
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
