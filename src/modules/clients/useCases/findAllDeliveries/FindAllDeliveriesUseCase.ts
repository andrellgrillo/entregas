import { prisma } from "../../../../database/prismaClient"

interface IFindAllDeliveries {
  id_client: string
}


export class FindAllDeliveriesUseCase {
  async execute({ id_client }: IFindAllDeliveries){
    const deliveries = prisma.clients.findUnique({
      where: {
        id: id_client
      },
      select: {
        id: true,
        username: true,
        Deliveries: true
      }
    });
    return deliveries;
  }
}