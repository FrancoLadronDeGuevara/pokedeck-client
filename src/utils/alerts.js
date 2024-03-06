import Swal from "sweetalert2";

export const customAlert = (title, text, icon, action = null) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085D6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
    customClass: {
      container: "alert-container",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (typeof action === "function") {
        action();
      }
    }
  });
};

export const autoCloseAlert = (title, type) => {
  Swal.fire({
    position: "bottom",
    title: `<div class="text-modal-container"><span class="text-${type}-modal">${title}</span></div>`,
    color: "black",
    showConfirmButton: false,
    toast: true,
    width: 300,
    timer: 2000,
    background: "transparent",
    customClass: {
      container: "alert-container",
      popup: type,
    },
  });
};

export const autoCloseAlertWithImage = (title, image, width, height) => {
  Swal.fire({
    html: `<img src=${image} style="display: block; margin: auto; width: ${width}px; height: ${height}px;" />`,
    title: `<p style="text-shadow: 5px 5px 5px black; color: red; font-weight: bolder">${title}</p>`,
    showConfirmButton: false,
    timer: 1500,
    position: "bottom",
    customClass: {
      container: "alert-container",
      popup: "alert-popup",
    },
    background: "transparent",
    backdrop: false,
    allowOutsideClick: false,
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  });
};
