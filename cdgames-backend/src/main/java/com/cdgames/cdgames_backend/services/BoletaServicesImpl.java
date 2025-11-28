package com.cdgames.cdgames_backend.services;

import com.cdgames.cdgames_backend.entities.*;
import com.cdgames.cdgames_backend.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BoletaServicesImpl implements BoletaServices {

    private final BoletaRepositories boletaRepo;
    private final DetalleBoletaRepositories detalleRepo;
    private final CarritoRepositories carritoRepo;
    private final ItemCarritoRepositories itemCarritoRepo;

    public BoletaServicesImpl(BoletaRepositories boletaRepo,
            DetalleBoletaRepositories detalleRepo,
            CarritoRepositories carritoRepo,
            ItemCarritoRepositories itemCarritoRepo) {
        this.boletaRepo = boletaRepo;
        this.detalleRepo = detalleRepo;
        this.carritoRepo = carritoRepo;
        this.itemCarritoRepo = itemCarritoRepo;
    }

    @Override
    public Boleta generarBoletaDesdeCarrito(Usuario usuario) {

        Carrito carrito = carritoRepo.findByUsuario(usuario)
                .orElseThrow(() -> new EntityNotFoundException("El usuario no tiene carrito."));

        List<ItemCarrito> items = itemCarritoRepo.findByCarrito(carrito);

        if (items.isEmpty()) {
            throw new IllegalStateException("El carrito está vacío, no se puede generar la boleta.");
        }

        int neto = items.stream()
                .mapToInt(ItemCarrito::getSubtotal)
                .sum();

        int iva = (int) Math.round(neto * 0.19);
        int total = neto + iva;

        Boleta boleta = new Boleta();
        boleta.setCliente(usuario);
        boleta.setNeto(neto);
        boleta.setIva(iva);
        boleta.setTotal(total);

        boleta = boletaRepo.save(boleta);

        String numero = "B-" + boleta.getId();
        boleta.setNumero(numero);
        boleta = boletaRepo.save(boleta);

        for (ItemCarrito item : items) {
            DetalleBoleta det = new DetalleBoleta();
            det.setBoleta(boleta);
            det.setProducto(item.getProducto());
            det.setCantidad(item.getCantidad());
            det.setPrecioUnitario(item.getPrecioUnitario());
            det.setSubtotal(item.getSubtotal());
            detalleRepo.save(det);
        }

        itemCarritoRepo.deleteAll(items);

        return boleta;
    }

    @Override
    public List<Boleta> listarBoletasCliente(Usuario cliente) {
        return boletaRepo.findByCliente(cliente);
    }

    @Override
    public List<Boleta> listarTodas() {
        return boletaRepo.findAll();
    }
}
