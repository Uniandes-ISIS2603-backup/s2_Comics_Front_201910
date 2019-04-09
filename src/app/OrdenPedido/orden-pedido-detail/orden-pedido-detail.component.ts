import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenPedidoService } from '../ordenPedido.service';
import {OrdenPedido} from '../ordenPedido';


import { OrdenPedidoDetail } from '../OrdenPedidoDetail';


@Component({
  selector: 'app-orden-pedido-detail',
  templateUrl: './orden-pedido-detail.component.html',
  styleUrls: ['./orden-pedido-detail.component.css']
})
export class OrdenPedidoDetailComponent implements OnInit {

  /**
    * The book's id retrieved from the path
    */
   
  constructor(
    private ordenPedidoService: OrdenPedidoService,
    private route: ActivatedRoute
  ) { }

ordenPedidoDetail: OrdenPedidoDetail;
@Input() ordenPedido_id: number;
loader: any;
  
  getOrdenPedidoDetail(): void {

    this.ordenPedidoService.getOrdenPedidoDetail(this.ordenPedido_id)
      .subscribe(o => {
        this.ordenPedidoDetail = o
      });
  }
onLoad(params) {

    this.ordenPedido_id = parseInt(params['id']);
    console.log(" en detail " + this.ordenPedido_id);
    this.ordenPedidoDetail = new OrdenPedidoDetail();
    this.getOrdenPedidoDetail();
  }
  ngOnInit() {
    this.ordenPedido_id = +this.route.snapshot.paramMap.get('id');
        this.ordenPedidoDetail = new OrdenPedidoDetail(); }

  ngOnDestroy() {
    this.loader.unsubscribe();
  }

}
