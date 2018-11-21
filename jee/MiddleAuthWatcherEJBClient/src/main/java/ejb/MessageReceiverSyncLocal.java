package ejb;

import model.UserModel;

import javax.ejb.Local;

@Local
public interface MessageReceiverSyncLocal {

    UserModel receiveMessage();
}
