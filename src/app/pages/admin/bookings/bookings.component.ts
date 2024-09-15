import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { AuthService } from '../../../services/auth.service';
import Swal from "sweetalert2";
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  selectedFilter: string = 'all';
  selectedBookings: string[] = []; // IDs de las reservas seleccionadas
  allSelected: boolean = false; // Controla si todas las reservas están seleccionadas

  constructor(private bookingService: BookingService, private authService: AuthService){
    // Obtener todas las reservas desde el servicio
    this.bookingService.getBookings().subscribe({
      next: (response)=>{
        this.bookings = response as Booking[]
        this.filteredBookings = this.bookings;
        console.log(this.bookings)
      },
      error: ()=>{

      }
    })
  }

  aplicarFiltro(filtro: string) {
    this.selectedFilter = filtro;

    if (filtro === 'all') {
      this.filteredBookings = this.bookings; 
    } else if (filtro === 'movies') {
      this.filteredBookings = this.bookings.filter(booking => booking.movie);
    } else if (filtro === 'series') {
      this.filteredBookings = this.bookings.filter(booking => booking.serie);
    } else if (filtro === 'current') {
      const today = new Date();
      this.filteredBookings = this.bookings.filter(booking => new Date(booking.startDate) <= today && new Date(booking.endDate) >= today);
    }
  }

 // Función para alternar la selección de todas las reservas
 toggleSelectAll(event: any) {
  this.allSelected = event.target.checked; 

  if (this.allSelected) {
    this.selectedBookings = this.filteredBookings.map(booking => booking._id); // Si se seleccionan todas, agregar todos los IDs de reservas
  } else {
    this.selectedBookings = []; // Si se deseleccionan todas, vaciar el array
  }
}

// Función para alternar la selección individual
toggleSelection(bookingId: string, event: any) {
  if (event.target.checked) {
    this.selectedBookings.push(bookingId);
  } else {
    this.selectedBookings = this.selectedBookings.filter(id => id !== bookingId);
  }
  this.allSelected = this.selectedBookings.length === this.filteredBookings.length;  // Actualizar el estado de "seleccionar todas" si todos los checkboxes individuales están marcados
}

// Función para confirmar y eliminar reservas
confirmarEliminar(bookingId: string) {
  const isMultiple = Array.isArray(bookingId); // Verificar si la eliminación es múltiple
  Swal.fire({
    title: isMultiple ? '¿Estás seguro?' : '¿Estás seguro?',
    text: isMultiple ? 'Esta acción eliminará todas las reservas seleccionadas y no se puede deshacer.' : 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: isMultiple ? 'Sí, eliminar todo' : 'Sí, eliminar',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      if (isMultiple) {
        this.eliminarSeleccionados(); // Eliminar todas las reservas seleccionadas
      } else {
        this.eliminarIndividual(bookingId as string); // Eliminar una sola reserva
      }
    }
  });
}

// Función para eliminar todas las reservas seleccionadas
async eliminarSeleccionados() {
  // Mostrar un cuadro de confirmación antes de proceder
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  // Si el usuario confirma, procedemos con la eliminación
  if (result.isConfirmed) {
    const promesasEliminacion = this.selectedBookings.map(id => this.eliminarIndividual(id)); // Crear un array de promesas para eliminar todas las reservas seleccionadas
    await Promise.all(promesasEliminacion);  // Esperar a que todas las eliminaciones se completen
    
    this.selectedBookings = []; // Después de eliminar, vaciamos la lista de seleccionados y desmarcamos "seleccionar todas"
    this.allSelected = false;
    this.filteredBookings = this.bookings;  // Actualizar la lista de reservas después de eliminar

    Swal.fire({
      title: 'Eliminadas',
      text: 'Las reservas seleccionadas fueron eliminadas con éxito',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}

// Función para eliminar una reserva individual
eliminarIndividual(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Eliminar reserva con ID: ${id}`);   // Lógica para eliminar la reserva individual (por ejemplo, llamando a un servicio)
    this.bookingService.deleteBooking(id).subscribe({     // Aquí se llama al servicio para eliminar la reserva de manera asíncrona
      next: () => {
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: "¡Reserva eliminada!",
          text: "Tu reserva ha sido eliminada correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        });

        // Actualizar las reservas eliminando la que se acaba de borrar
        this.bookings = this.bookings.filter(booking => booking._id !== id);
        this.filteredBookings = this.bookings;  // Actualizar la lista filtrada de reservas

        // Resolver la promesa para indicar que la eliminación ha sido exitosa
        resolve();
      },
      error: (err) => {
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          title: "Oops!",
          text: "Ha ocurrido un error al eliminar la reserva",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
        reject(err);
      }
    });
  });
}

  editar(bookingId: string) {
    console.log('Editar reserva:', bookingId)
    const reservaEditar: Booking | undefined = this.bookings.find(x => x._id === bookingId);
    if (reservaEditar) {
      console.log('Editar reserva:', reservaEditar)
      let title = '';
      if (reservaEditar.serie) {
        title = reservaEditar.serie.title;
      } else {
        title = '';
      }
      const movieTitle = reservaEditar.movie?.title ?? '';
      const serieTitle = reservaEditar.serie?.title ?? '';
     
      Swal.fire({
        title: `Editar reserva de: <br> ${movieTitle} ${title}`,
        
        html: `<div>
          <div>
            <label class="form-label">Fecha inicio</label>
            <input id="startDate" type="date" class="form-control" value="${reservaEditar.startDate}">
          </div>
          <div>
            <label class="form-label">Fecha fin</label>
            <input id="endDate" type="date" class="form-control" value="${reservaEditar.endDate}">
          </div>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
          const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
          if (!startDate || new Date(startDate) < new Date()) {
            Swal.showValidationMessage('La fecha de inicio no puede ser anterior a la fecha actual o estar vacía.');
            return null;
        }
        if (!endDate) {
            Swal.showValidationMessage('La fecha de fin no puede estar vacía.');
            return null;
        }
          return { startDate, endDate };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const { startDate, endDate } = result.value;
          this.bookingService.updateBooking(bookingId, startDate, endDate).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Reserva actualizada!',
                text: 'La reserva ha sido actualizada correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
              reservaEditar.startDate = startDate;
              reservaEditar.endDate = endDate;
            },
            error: () => {
              Swal.fire({
                title: 'Oops!',
                text: 'Ha ocurrido un error al actualizar la reserva',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        }
      });
    } else {
      console.error('No se encontró la reserva a editar')
    }
  }
}