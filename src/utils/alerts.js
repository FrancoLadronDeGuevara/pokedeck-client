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
            container: 'alert-container',
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
        timer: 2000,
        customClass: {
            container: 'alert-container',
        },
    });
}

export const autoCloseAlertWithImage = (title, imagen, width, height) => {
    Swal.fire({
        html: `<img src=${imagen} style="display: block; margin: auto; width: ${width}px; height: ${height}px;" />`,
        title: title,
        showConfirmButton: false,
        timer: 1500,
        position: 'bottom',
        customClass: {
            container: 'alert-container',
            popup: 'alert-popup',
        },
        background: 'transparent',
        backdrop: false,
        allowOutsideClick: false,
        showClass: {
            popup: 'animate__animated animate__slideInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        }
    });
}