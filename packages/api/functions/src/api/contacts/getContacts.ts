import * as express from "express";
import getUserData from '../../utils/getUserData';
import verifyUser from '../../utils/verifyUser';
import { getEventsService } from '../events/getEvents';
import { getActivitiesService } from '../activities/getActivities';
import getDataByIDList from '../../core/getDataByIDList';

export async function getContactsService(firestore: FirebaseFirestore.Firestore, userName: string) {
  return await getDataByIDList(firestore, userName, "contacts");
}

function getContactsEndpoint(router: express.Router, firestore: FirebaseFirestore.Firestore) {
  router.post("/get", async (req: express.Request, res: express.Response) => {
    try {
      const { userName, password } = req.body;
      const user = await getUserData(firestore, userName);
      if (!user) {
        throw new Error("Error: No such user");
      }
      verifyUser(user, password);
      // ------------------------------------------------------- //
      const contactsData = await getContactsService(firestore, userName);
      const eventsData = await getEventsService(firestore, userName);
      const activitiesData = await getActivitiesService(firestore, userName);
      const responseData = {
        contacts: contactsData,
        events: eventsData,
        activities: activitiesData
      }
      // ------------------------------------------------------- //
      return res.status(200).send(responseData);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
}

export default getContactsEndpoint;