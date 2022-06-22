import styles from "./ProfileStats.module.css";
import ScoreDisplayItem from "../ScoreDisplay";

type Props = {
  averageCPM: number;
  averageAccuracy: number;
  averageErrors: number;
  victories: number;
};

/**
 * Displays the user's stats displayed in user profile page.
 * Stats are consisted of average CPM (characters per minute), average accuracy, average errors, and victories.
 *
 * @param averageCPM average CPM
 * @param averageAccuracy average accuracy
 * @param averageErrors average errors
 * @param victories number of victories
 * @returns a profile stats component.
 */
function ProfileStats({
  averageCPM,
  averageAccuracy,
  averageErrors,
  victories,
}: Props) {
  return (
    <div className={styles.MainContainer}>
      <ScoreDisplayItem
        score={averageCPM}
        label="Average"
        nextLineLabel="CPM"
      />
      <ScoreDisplayItem
        score={averageAccuracy}
        label="Average"
        nextLineLabel="Accuracy"
      />
      <ScoreDisplayItem
        score={averageErrors}
        label="Average"
        nextLineLabel="Errors"
      />
      <ScoreDisplayItem score={victories} label="Victories" />
    </div>
  );
}

export default ProfileStats;
