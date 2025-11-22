import Dialog from "./Dialog";
import { FOCUS_ICON, RECOVERY_ICON } from "../../constants";

type Props = { open: boolean; onClose: () => void };

export default function LearnMoreDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} onSave={onClose} title="About 'An Adventurer's Life for Me'" saveLabel="Let's Go!">
      <p>This app helps you treat tasks like small adventures and quests: earn and spend coins to build a habit loop and make progress fun.</p>
      <p>
        Earn coins by finishing tasks (encounters) or working towards bigger goals (adventures), then spend them on fun or relaxing activities (boons).
        Toggle edit mode to customize the lists to fit your life and preferences using the pencil edit icon next to the page title.
      </p>
      <p>
        Add your adventurer name at the bottom using the pencil edit icon.
        Check your current coin balances and today's earnings and spendings there too.
        Each day at 3:00 AM your balances will be updated and task completions reset for a new day of adventuring.
      </p>
      <p>
        Try using the {FOCUS_ICON} to indicate how much focus or willpower an effort requires, and the {RECOVERY_ICON} to indicate how important an effort is.
        Adjust the cost of boons to match your needs and motivate yourself.
        Make it fair and fun and you'll be completing quests in no time.
      </p>
      <p>Happy adventuring!</p>
    </Dialog>
  );
}
