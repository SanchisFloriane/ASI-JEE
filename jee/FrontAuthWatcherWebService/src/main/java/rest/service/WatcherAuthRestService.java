package rest.service;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/WatcherAuth")
public interface WatcherAuthRestService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/")
    String doPost(String authentication);
}
