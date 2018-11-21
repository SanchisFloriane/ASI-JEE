package rest.service.impl;

import com.google.gson.JsonObject;
import data.URepository;
import ejb.MessageReceiverSyncLocal;
import ejb.MessageSenderLocal;
import enumeration.Role;
import model.UserModel;
import rest.service.WatcherAuthRestService;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import com.google.gson.Gson;

@Stateless
@LocalBean
public class WatcherAuthRestServiceImpl implements WatcherAuthRestService {

    private static final long serialVersionUID = 1L;

    @Inject
    private URepository userRepository;

    @EJB
    MessageSenderLocal sender;

    @EJB
    MessageReceiverSyncLocal receiver;

    @Override
    public String doPost(String authentication){

        Gson gson = new Gson();
        UserModel userModel = gson.fromJson(authentication, UserModel.class);
        sender.sendMessage(userModel);

        System.out.println("doPost : " + userModel.toString());

        UserModel receive = receiver.receiveMessage();
        JsonObject jsonToReturn = new JsonObject();
        if(receive != null) {
            jsonToReturn.addProperty("login", receive.getLogin());
            jsonToReturn.addProperty("validAuth", receive.getValidAuth());
            if (userModel.getRole() != null) {
                jsonToReturn.addProperty("role", receive.getRole().toString());
            } else {
                jsonToReturn.addProperty("role", Role.NONE.toString());
            }
        } else {
            jsonToReturn.addProperty("login", userModel.getLogin());
            jsonToReturn.addProperty("validAuth", false);
            jsonToReturn.addProperty("role", Role.NONE.toString());
        }

        return jsonToReturn.toString();
    }
}
