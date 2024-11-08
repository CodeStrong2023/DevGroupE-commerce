package com.devgroup.ecommerce.controllers;
import com.devgroup.ecommerce.models.UserBuyer;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.net.HttpStatus;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MercadoPagoController {
    @Value("${codigo.mercadoLibre}")
    private String mercadoLibreToken;

    @RequestMapping(value= "api/mp", method = RequestMethod.POST)
    public String gestList (@RequestBody UserBuyer userBuyer){
        if(userBuyer == null){
            return "error jsons :/";
        }
        String title = userBuyer.getTitle();
        int quantity = userBuyer.getQuantity();
        BigDecimal price = userBuyer.getUnit_price();
        try {
            MercadoPagoConfig.setAccessToken(mercadoLibreToken);

            // 1 - Preferencia de vta

            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(title)
                    .quantity(quantity)
                    .unitPrice(price)
                    .currencyId("ARS")
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            // 2- Preferencia de control de sucesos

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest
                    .builder()
                    .success("") //Donde se lo va reedirigir después de pagar NO SE PUEDE PONER UN LOCALHOST
                    .pending("") //Hay una operación pendiendte
                    .failure("") // Si hay un fallo se muestra un 404
                    .build();

            //Juntamos las dos preferencias en una nueva
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .build();

            //Creamos un objeto del tipo cliente para comunicarse con MP
            PreferenceClient client = new PreferenceClient();

            Preference preference = client.create(preferenceRequest);

            //Retornamos la referencia
            return preference.getId();
        }catch (MPException | MPApiException e){return e.toString();}
    }

}
