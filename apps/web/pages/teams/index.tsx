import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { TeamsListing } from "@calcom/features/ee/teams/components";
import Shell from "@calcom/features/shell/Shell";
import { WEBAPP_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button } from "@calcom/ui";
import { Plus } from "@calcom/ui/components/icon";

import PageWrapper from "@components/PageWrapper";

function Teams() {
  const { t } = useLocale();
  const session = useSession();
  return (
    <Shell
      heading={t("teams")}
      hideHeadingOnMobile
      subtitle={t("create_manage_teams_collaborative")}
      CTA={
        !session.data?.user.organizationId ? (
          <Button
            variant="fab"
            StartIcon={Plus}
            type="button"
            href={`${WEBAPP_URL}/settings/teams/new?returnTo=${WEBAPP_URL}/teams`}>
            {t("new")}
          </Button>
        ) : session.data?.user.isOrgAdmin ? (
          <Button
            variant="fab"
            StartIcon={Plus}
            type="button"
            href={`${WEBAPP_URL}/settings/teams/new?returnTo=${WEBAPP_URL}/teams`}>
            {t("new")}
          </Button>
        ) : undefined
      }>
      <TeamsListing />
    </Shell>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations("en", ["common"])),
    },
  };
};

Teams.requiresLicense = false;
Teams.PageWrapper = PageWrapper;

export default Teams;
