import LearnCategoryBanner from "@/components/learn/learn-category-banner";
import SubscribeBanner from "@/components/common/subscribe-banner";
import CategoryLearnList from "@/components/learn/category-learn-list";

const LearnCategoryPage = () => {
  return (
    <>
      <LearnCategoryBanner />
      <CategoryLearnList />
      <SubscribeBanner />
    </>
  );
};

export default LearnCategoryPage;
