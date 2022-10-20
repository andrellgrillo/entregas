import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { AuthenticateClientController } from "./modules/account/authenticateUser/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientControllers";
import { CreateDeliveriesController } from "./modules/deliveries/useCases/createDeliveries/CreateDeliveries.Controller";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveriesController = new CreateDeliveriesController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

//Rotas dos Clientes
routes.post("/clients", createClientController.handle);
routes.post("/clients/authenticate", authenticateClientController.handle);
routes.get("/clients/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)

//Rotas dos Entregadores
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle );
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

//Rotas dos Pedidos
routes.post("/deliveries", ensureAuthenticateClient, createDeliveriesController.handle);
routes.get("/deliveries/available", ensureAuthenticateDeliveryman , findAllAvailableController.handle)
routes.patch("/deliveries/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.patch("/deliveries/end/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes };