import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './FormContact.css';

export function FormContact() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const validarEmail = (em) => /\S+@\S+\.\S+/.test(em);

  const enviarMensaje = (e) => {
    e.preventDefault();

    const n = nombre.trim();
    const em = email.trim();
    const m = mensaje.trim();

    if (!n || !em || !m) {
      Swal.fire({ title: 'Envío fallido', text: 'Completa todos los campos solicitados', icon: 'error' });
      return;
    }

    if (!validarEmail(em)) {
      Swal.fire({ title: 'Email inválido', text: 'Ingresa un correo válido', icon: 'error' });
      return;
    }

    Swal.fire({ title: 'Mensaje enviado', text: 'El mensaje ha sido enviado correctamente', icon: 'success' });

    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className='container-contacto'>
      <form className='formContacto' id='formulario' onSubmit={enviarMensaje}>
        <h3>Contacto</h3>

        <label htmlFor="username">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Ingrese su usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="email">Correo</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          rows="6"
          placeholder="Escriba su mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <button type="submit" id="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
}