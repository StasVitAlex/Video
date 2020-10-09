import Swal, { SweetAlertOptions } from "sweetalert2";

export enum NotificationType {
    error = 'error',
    success = 'success'
}

class NotificationService {
    send (type: NotificationType, title: string): void {
        const swal = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        } as SweetAlertOptions);
        swal.fire({
            icon: type,
            title: title,
        });
    }
}

export const notificationService = new NotificationService();
