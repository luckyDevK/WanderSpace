import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useOptimisticMutation<TData, TVariables>({
  mutationFn,
  updateFn,
  onDone,
}: {
  mutationFn: (data: TVariables) => Promise<TData>;
  updateFn: (oldData: TData[], input: TVariables, result: TData) => TData[];
  onDone?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onMutate: async (input) => {
      await queryClient.cancelQueries({
        queryKey: ['userPlaces'],
        exact: true,
      });

      const previousPlace = queryClient.getQueryData<TData[]>(['userPlaces']);
      return { previousPlace, input };
    },

    onSuccess: (result, input) => {
      queryClient.setQueryData<TData[]>(['userPlaces'], (old = []) =>
        updateFn(old, input, result),
      );
      onDone?.();
    },

    onError: (_err, _input, context) => {
      if (context?.previousPlace) {
        queryClient.setQueryData(['userPlaces'], context.previousPlace);
      }
      onDone?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      queryClient.invalidateQueries({ queryKey: ['userPlaces'] });
    },
  });
}
