package ejb;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.Queue;

import model.UserModel;

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {

    @Inject
    JMSContext context;

    @Resource(mappedName = "java:/jms/queue/watcherqueue")
    Queue queue;

    @Override
    public UserModel receiveMessage() {

        System.out.println("Message reçu");
        JMSConsumer consumer = context.createConsumer(queue);
        UserModel user = consumer.receiveBody(UserModel.class, 1000);
        consumer.close();
        return user;
    }
}