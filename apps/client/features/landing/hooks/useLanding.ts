import { useQuery } from "@tanstack/react-query";
import { landingService } from "../api/landing.service";

export const useCampaignsQuery = () =>
  useQuery({ queryKey: ["campaigns"], queryFn: landingService.getCampaigns });

export const useCategoriesQuery = () =>
  useQuery({ queryKey: ["categories"], queryFn: landingService.getCategories });
