import Swal from "sweetalert2";

const sweetAlert = Swal.mixin({
  customClass: {
    container: 'bg-gray-800 text-gray-100',
    popup: 'bg-gray-700 text-gray-100',
    title: 'text-gray-100 text-lg font-semibold',
    closeButton: 'text-gray-100 hover:text-gray-200',
    htmlContainer: 'text-gray-100 text-base',
    input: 'text-gray-100 bg-gray-600 border-none',
    inputLabel: 'text-gray-100 text-base',
    validationMessage: 'text-gray-100 text-base',
    actions: 'text-gray-100 flex gap-2',
    confirmButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
    cancelButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
  },
  buttonsStyling: false,
});

export default sweetAlert;
