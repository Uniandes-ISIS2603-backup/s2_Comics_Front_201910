import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxRolesService, NgxPermissionsService} from 'ngx-permissions'
import 'rxjs/add/operator/catch';
import {Coleccionista} from "../Coleccionista/coleccionista";

/**
 * The service provider for everything related to authentication
 */
@Injectable()
export class AuthService {

    /**
     * Constructor of the service
     * @param router Angular's Router to redirect the user on login or logout
     * @param roleService NgxRolesService to manage authentication roles
     * @param permissionsService NgxPermissionsService to manage authentication permissions
     */
    constructor (private router: Router, private roleService: NgxRolesService, private permissionsService: NgxPermissionsService) { }

    start (): void {
        this.permissionsService.flushPermissions();
        this.roleService.flushRoles();
        this.permissionsService.loadPermissions(['edit_author_permission', 'delete_author_permission', 'leave_review']);
        const role = localStorage.getItem('role');
        if (!role) {
            this.setGuestRole();
        } else if (role === 'ADMIN') {
            this.setAdministratorRole();
        } else {
            this.setClientRole();
        }
    }

    setGuestRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('GUEST', ['']);
    }

    setClientRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('CLIENT', ['leave_review']);
        localStorage.setItem('role', 'CLIENT');
    }

    /**
     *
     * @param compradorId
     */
    setCompradorRole(compradorId):void
    {
        this.roleService.flushRoles();
        this.roleService.addRole('Comprador', ['']);
        localStorage.setItem('role', 'Comprador');
        localStorage.setItem('user', compradorId + '');
        // localStorage.get('user');
    }

    /**
     *
     * @param vendedorId
     */
    setVendedorRole(vendedorId): void
    {
        this.roleService.flushRoles();
        this.roleService.addRole('Vendedor', ['']);
        localStorage.setItem('role', 'Vendedor');
        localStorage.setItem('user', vendedorId + '');
    }

    setAdministratorRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('ADMIN', ['']);
        localStorage.setItem('role', 'ADMIN');
        console.log("Admin");
    }

    printRole (): void {
        console.log(this.roleService.getRoles());
    }

    /**
     * Logs the user in with the desired role
     * @param role The desired role to set to the user
     * @param user
     */
    login (role): void {
        if (role === 'Administrator') {
            this.setAdministratorRole();
        } else {
            this.setClientRole()
        }
        this.router.navigateByUrl('/');
    }

    /**
     *
     * @param role
     * @param userId
     */
    logIn(role, userId)
    {
        if(role === 'Administrador')
        {
            this.setAdministratorRole();
        }
        else if(role == 'Vendedor')
        {
            this.setVendedorRole(userId);
        }
        else if(role == 'Comprador')
        {
            this.setCompradorRole(userId);
        }
        this.router.navigateByUrl('/home');
    }

    /**
     * Logs the user out
     */
    logout (): void {
        this.roleService.flushRoles();
        this.setGuestRole();
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/home');
    }
}