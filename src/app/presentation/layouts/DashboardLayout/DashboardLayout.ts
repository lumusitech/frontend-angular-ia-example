import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuItem } from '@components/sidebarMenuItem/sidebarMenuItem';
import { routes } from 'app/app.routes';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarMenuItem],
  templateUrl: './dashboardLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayout {
  //? Only pass defined routes with data property
  public routes = routes[0].children?.filter((route) => route.data);
}
