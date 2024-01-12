import Swal from 'sweetalert2';

export const customAlert = (title, text, icon, action = null) => {
    Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        customClass: {
            container: 'custom-alert-container',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeof action === 'function') {
                action();
            }
        }
    });
};

export const autoCloseAlert = (title, icon, background) => {
    Swal.fire({
        position: "bottom",
        title,
        icon,
        background,
        color: "#fff",
        showConfirmButton: false,
        toast: true,
        timer: 2000
    });
}