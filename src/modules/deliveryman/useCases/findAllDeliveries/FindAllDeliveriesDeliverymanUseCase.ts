import { prisma } from "../../../../database/prismaClient"

interface IFoundAllDeliveries {
  id_deliveryman: string
}

export class FindAllDeliveriesUseCase {
  async execute({ id_deliveryman }: IFoundAllDeliveries){
    const deliveries = await prisma.deliveryman.findUnique({
      where: {
        id: id_deliveryman
      },
      select: {
        id: true,
        username: true,
        Deliveries: true
      }
    });
    return deliveries
  }
}