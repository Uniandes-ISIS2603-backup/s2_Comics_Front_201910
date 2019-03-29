import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompradorService } from "../comprador.service";
import { CompradorDetail } from "../comprador-detail";

@Component({
    selector: 'app-comprador-detail',
    templateUrl:'./comprador-detail.component.html',
    styleUrls: ['./comprador-detail.component.css']
})

/**
 * Clase que representa el compradorDetail.
 */
export class CompradorDetailComponent implements OnInit
{
    /**
     * 
     * @param route 
     * @param service 
     */
    constructor(
        private route:ActivatedRoute,
        private service: CompradorService
    )
    {

    }

    /**
     * El comprador.
     */
    @Input() compradorDetail:CompradorDetail;

    /**
     * El  id del comprador que viene de la ruta de acceso.
     */
    id:number;

    /**
     * Método que obtiene el comprador cuyos detalles queremos mostrar.
     */
    getCompradorDetail():void
    {
        this.service.getCompradorDetail(this.id)
        .subscribe(compradorDetail => 
            {
                this.compradorDetail = compradorDetail;
            });
    }

    /**
     * Se utiliza este metodo para inicialiazr el componente
     * Se necestia crear el comprador con eso no se tiene como indefinido.
     */
    ngOnInit()
    {
        this.id = +this.route.snapshot.paramMap.get('id');
        if(this.id)
        {
            this.compradorDetail = new CompradorDetail();
            this.getCompradorDetail();
        }
    }
}